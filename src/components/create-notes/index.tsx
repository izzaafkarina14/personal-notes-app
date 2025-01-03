import { useState } from "react";
import styles from "./style.module.css";

type CreateNotesProps = {
  addNote: (title: string, body: string) => void;
};

export default function CreateNotes({ addNote }: CreateNotesProps) {
  const [remainingChars, setRemainingChars] = useState<number>(50);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 50) {
      setTitle(inputValue);
      setRemainingChars(50 - inputValue.length)
    } else {
      const trimmedValue = inputValue.slice(0, 50);
      setTitle(trimmedValue);
      setRemainingChars(0);
    }
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNote(title, body);
    setTitle("");
    setBody("");
    setRemainingChars(50);
  };
  return (
    <>
      <div className={styles.createWrapper}>
        <h2 className={styles.hero}>Buat Catatan</h2>
        <div className={styles.inputWrapper}>
          <p>Sisa Karakter: {remainingChars}</p>
          <div>
            <input
              type="text"
              placeholder="Ini adalah judul ..."
              onChange={handleTitleChange}
              value={title}
            />
            <br />
            <textarea
              placeholder="Tuliskan catatanmu di sini ..."
              onChange={handleBodyChange}
              value={body}
              style={{
                width: "500px",
                height: "175px",
                alignItems: "flex-start",
              }}
            />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Buat
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
