import { useState } from "react";
import "../style/NoteInput.css"

//props expected by the NoteInput component
interface NoteInputProps {
    onSummarize: (text: string) => void //callback function to handle summarization
    loading: boolean    //flag to indicate if the summarization process is ongoing
}

const NoteInput = ({ onSummarize, loading}: NoteInputProps) => {
    const [text, setText] = useState("");
    
    //Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() //prevent default form behavior (page reload)
        if (text.trim()) onSummarize(text) //Call onSummarize only if text is not empty
    }

    return(
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>Notes: </h4>
            <textarea
                className="form-control mb-2"
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste notes here.."
                disabled={loading}
            />
            <button className="btn enter-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Enter"}
            </button>
        </form>
    )
}

export default NoteInput