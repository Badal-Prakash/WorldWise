// import { useNavigate } from "react-router-dom";
// import Button from "./Button";
// function BackButton() {
//   const nevigate=useNavigate();
//   return (
//     <Button
//       type="back"
//       onClick={(e) => {
//         e.preventDefault();
//         nevigate(-1);
//       }}
//     >
//       &larr; Back
//     </Button>
//   );
// }

// export default BackButton;
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
