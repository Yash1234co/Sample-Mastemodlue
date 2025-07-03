import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddCommentPage() {
  const { sampleId } = useParams();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sampleId) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getcomments/${sampleId}`);
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    fetchComments();
  }, [sampleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/comments", {
        Sample: sampleId,
        text,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("Comment posted!");
        setText("");
        const updated = await axios.get(`http://localhost:3000/getcomments/${sampleId}`);
        setComments(updated.data);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to post comment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          Sample Ref:{" "}
          <span className="text-gray-600">
            {comments[0]?.Sample?.SampleRef || sampleId}
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/sample/${sampleId}/comments`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Comments
          </button>
          <button
            onClick={() => navigate(`/sample/${sampleId}/upload-image`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Images
          </button>
          <button
            onClick={() => navigate("/sample")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Back
          </button>
        </div>
      </div>

     
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows="4"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-blue-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
      </form>

      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Previous Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="border p-4 rounded shadow-sm bg-gray-50"
              >
                <p className="text-gray-800">{comment.text}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Sample Ref:{" "}
                  <span className="font-medium">
                    {comment.Sample?.SampleRef || "N/A"}
                  </span>{" "}
                  | Due Date:{" "}
                  <span className="font-medium">
                    {comment.Sample?.DueDate
                      ? new Date(comment.Sample.DueDate).toLocaleDateString()
                      : "N/A"}
                  </span>{" "}
                  | Commented:{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
