import { formatTime } from "../utilities/helper";
function Comment(props) {
  let commentDate = new Date(props.commentInfo.comment_time);
  let commentTime = formatTime(commentDate);
  return (
    <div className="comment_wrapper">
      <div className="comment_user">
        <div className="comment_user_name">{props.commentInfo.commenter}</div>
        <div className="comment_time">{commentTime}</div>
      </div>
      <div className="comment_section">
        <div
          className="comment_data"
          dangerouslySetInnerHTML={{ __html: props.commentInfo.comment }}
        ></div>
      </div>
    </div>
  );
}

export default Comment;
