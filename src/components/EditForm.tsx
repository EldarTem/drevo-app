import ReactDOM from "react-dom";
import React from "react";
import RelativeProfileModal from "./RelativeProfileModal"; // Убедитесь, что модалка подключена правильно

class EditForm {
  private modalContainer: HTMLDivElement;

  constructor() {
    this.modalContainer = document.createElement("div");
    document.body.appendChild(this.modalContainer);
  }

  init(obj: any) {
    console.log("EditForm initialized with", obj);
  }

  show(node: any) {
    console.log("EditForm show called for node", node);

    ReactDOM.render(
      <RelativeProfileModal
        id="relative-modal"
        onClose={() => this.hide(false)}
      />,
      this.modalContainer
    );
  }

  hide(showldUpdateTheNode: boolean) {
    console.log("EditForm hide called", showldUpdateTheNode);

    ReactDOM.unmountComponentAtNode(this.modalContainer);
  }
}

export default EditForm;
