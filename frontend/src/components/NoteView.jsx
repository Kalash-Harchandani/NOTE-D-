const NoteView = ({ selectedNote }) => {
  if (!selectedNote) return null;

  return (
    <>
      <h3>{selectedNote.title}</h3>
      <p>{selectedNote.content}</p>
    </>
  );
};

export default NoteView;