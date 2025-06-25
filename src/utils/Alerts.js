import Swal from "sweetalert2";

export const successAlert = (message) => {
  Swal.fire({
    position: "top",
    icon: "success",
    titleText: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    position: "top",
    icon: "error",
    titleText: message,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const confirmAlert = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};
