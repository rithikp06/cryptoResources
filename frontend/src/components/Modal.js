import "../css/Modal.css";
import { createPortal } from "react-dom";
import { Button } from "react-bootstrap";

export default function Modal(props) {
  return createPortal(
    <>
      <div className="custom-modal-backdrop"></div>
      <div className="custom-modal">
        <Button onClick={props.onClose}>
          Close
        </Button>

        <h3>{props.title}</h3>
        <div>{props.children}</div>
        {props.form}
      </div>
    </>,
    document.getElementById("modal-container")
  );
}
