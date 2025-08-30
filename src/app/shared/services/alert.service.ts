import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async toastSuccess(message: string) {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).fire({
      icon: "success",
      title: message,
    });
  }
  async toastError(message: string) {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).fire({
      icon: "error",
      title: message
    });
  }
  async toastWarning(message: string) {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).fire({
      icon: "warning",
      title: message
    });
  }
  async toastInfo(message: string) {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).fire({
      icon: "info",
      title: message
    });
  }
  async toastQuestion(message: string) {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    }).fire({
      icon: "question",
      title: message
    });
  }

  async alertOptions(text: string, onConfirm: Function = () => {}, onCancel: Function = () => {}) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "",
        cancelButton: "btn btn-danger"
      },
      width: 300,
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      text: text,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Não",
      reverseButtons: true
    }).then(async (selectedButton) => {
      if (selectedButton.isConfirmed) {
          onConfirm();
      } else {
        onCancel();
      }
    });
  }
}
