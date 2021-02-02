export {renderLoading}
const renderLoading = (button, isLoading, textButton) => {
    if (isLoading) {
      button.setAttribute("disabled", true);
      button.textContent = textButton;
    } else {
      button.removeAttribute("disabled");
      button.textContent = textButton;
    }
  };