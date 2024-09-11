import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ApiModel, Customer } from './models/ApiModel';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-angular';
  masterService = inject(MasterService);
  @ViewChild('registerModal') registerModal: ElementRef | undefined;

  private formBuilder = inject(FormBuilder);

  registerFormGroup: FormGroup = this.formBuilder.group({
    Name: new FormControl(''),
    MobileNo: new FormControl(''),
    Password: new FormControl(''),
  });

  openRegisterModal() {
    if (this.registerModal) {
      this.registerModal.nativeElement.style.display = 'block';
    }
  }
  registerNewCustomer() {
    debugger
    const formsValues: Customer =
    {
      CustId: 0,
      Name: this.registerFormGroup.value.Name ?? '',
      MobileNo: this.registerFormGroup.value.MobileNo ?? '',
      Password: this.registerFormGroup.value.Password ?? '',
    }
    this.masterService.registerNewCustomer(formsValues)
      .subscribe((res: ApiModel) => {
        if (!res.result) {
          alert('Falha ao realizar o registro!');
          return;
        } else {
          alert('Registro feito com Sucesso!');
          //this.closeRegisterModal();
        }
      });
  }
}
