import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

const createPost = () => {
          addPost({ text });
          setText("");
}
  return (
    <div class="post-form">
      <form
        class="form my-1"
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Start a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit" class="btn btn-dark my-1" value="Submit" onClick={createPost}>Post </button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
