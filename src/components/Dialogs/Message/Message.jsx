import s from "./Message.module.css";

const Message = (props) => {
  return <div className={s.dialog}>{props.message}</div>;
};

export default Message;
