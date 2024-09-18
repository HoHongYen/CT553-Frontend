import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import toast from "react-hot-toast";
import { HiMicrophone } from "react-icons/hi2";
import ButtonIcon from "../ui/ButtonIcon";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dictaphone = () => {
  const commands = [
    {
      command: "tìm kiếm *",
      callback: (searchText) => {
        console.log("Searching " + searchText);
        setSearchQuery(searchText);
        searchParams.set("s", searchText);
        setSearchParams(searchParams);
        navigate(`/tim-kiem/?${searchParams.toString()}`);
      },
    },
    {
      command: "tối",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
    {
      command: "dừng",
      callback: () => {
        console.log("Stop listening");
        handleStop();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    if (transcript === "" || !isListening) {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (toastId) {
        toast.dismiss(toastId);
      }
      let tempId = toast(transcript, {
        icon: (
          <div className="animation-ping">
            <HiMicrophone />
          </div>
        ),
        style: {
          borderRadius: "10px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });

      setSearchQuery(transcript);
      searchParams.delete("imageUrl");
      searchParams.set("s", transcript);
      setSearchParams(searchParams);
      navigate(`/tim-kiem/?${searchParams.toString()}`);

      resetTranscript();

      setToastId(tempId);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  const handleListing = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      // continuous: false,
      // language: 'en-US',
    });
  };
  const handleStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };
  const handleReset = () => {
    handleStop();
    resetTranscript();
    handleListing();
  };
  return (
    <div className="flex gap-5 items-center">
      <div>
        {!isListening ? (
          <div onClick={handleListing} className="flex gap-5">
            <ButtonIcon>
              <HiMicrophone />
            </ButtonIcon>
          </div>
        ) : (
          <div onClick={handleStop} className="flex gap-5">
            <div className="relative flex items-center">
              <ButtonIcon className="animate-ping absolute opacity-75">
                <HiMicrophone className="h-full w-full" />
              </ButtonIcon>
              <ButtonIcon className="relative">
                <HiMicrophone className="h-8 w-8" />
              </ButtonIcon>
            </div>
          </div>
        )}
      </div>
      {/* {transcript && <button onClick={handleReset}>Ghi lại</button>} */}
    </div>
  );
};
export default Dictaphone;
