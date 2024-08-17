// eslint-disable
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.error(error);
        throw new (Error("Cabins could not be loaded"));
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/edit cabin
    let query = supabase.from('cabins');
    // a. Create
    if (!id)
        query = query.insert([{ ...newCabin, image: imagePath }])

    // b. Edit
    if (id)
        query = query.update({ ...newCabin, image: imagePath })
            .eq("id", id)

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    // 2. Upload image
    if (hasImagePath) return data;
    
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // 3. Delete the cabins if the image upload fails
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        throw new Error("Image could not be uploaded");
    }
    return data;

}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return data;
}