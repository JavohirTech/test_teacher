import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const FileUpload = ({ setUploadQuizImage }) => {
  const [pastedImageUrl, setPastedImageUrl] = useState(null);

  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === "file" && item.type.includes("image")) {
        const blob = item.getAsFile();
        const imageUrl = URL.createObjectURL(blob);
        setPastedImageUrl(imageUrl);
        setUploadQuizImage(blob); // Set the file to the parent component
      }
    }
  };

  const handleRemoveImage = () => {
    URL.revokeObjectURL(pastedImageUrl);
    setPastedImageUrl(null);
    setUploadQuizImage(null); // Reset the file in the parent component
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div>
      {pastedImageUrl && (
        <div
          className="border position-relative display-inline"
          style={{ width: "250px" }}
        >
          <img src={pastedImageUrl} alt="Pasted Image" width="250px" />
          <i
            onClick={handleRemoveImage}
            className="cursor-pointer fa-solid fa-circle-xmark fa-2x position-absolute top-0 end-0 mt-1 mr-1"
          ></i>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  setUploadQuizImage: PropTypes.func.isRequired,
};
