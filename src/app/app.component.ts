import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ApiModel, CartData, Customer, LoginModel } from './models/ApiModel';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from './services/master.service';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'ecommerce-angular';
  registerObj: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();

  loggedUserData: Customer = new Customer();
  masterService = inject(MasterService);

  @ViewChild('registerModal') registerModal: ElementRef | undefined;
  @ViewChild('loginModal') loginModal: ElementRef | undefined;



  private formBuilderRegister = inject(FormBuilder);
  private formBuilderLogin = inject(FormBuilder);

  registerFormGroup: FormGroup = this.formBuilderRegister.group({
    Name: new FormControl(''),
    MobileNo: new FormControl(''),
    Password: new FormControl(''),
  });

  loginFormGroup: FormGroup = this.formBuilderLogin.group({
    UserName: new FormControl(''),
    UserPassword: new FormControl(''),
  });

  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }

  openRegisterModal() {
    if (this.registerModal) {
      this.registerModal.nativeElement.style.display = 'block';
    }
  }
  closeRegisterModal() {
    if (this.registerModal) {
      this.registerModal.nativeElement.style.display = 'none';
    }
  }
  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }
  closeLoginModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }

  registerNewCustomer() {
    const formsValues: Customer =
    {
      custId: 0,
      name: this.registerFormGroup.value.Name ?? '',
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

  onLoginUser() {
    const formLoginValues: LoginModel =
    {
      UserName: this.loginFormGroup.value.UserName ?? '',
      UserPassword: this.loginFormGroup.value.UserPassword ?? '',
    }
    this.masterService.onLogin(formLoginValues)
      .subscribe((res: ApiModel) => {
        if (res.result) {
          this.loggedUserData = res.data;
          localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
          this.closeLoginModal();
          alert('Login realizado com Sucesso!');
        } else {
          alert('Falha ao realizar o login!');
          //this.closeLoginModal();
        }
      })
  }
  logOff() {
    localStorage.removeItem(Constant.LOCAL_KEY);

    this.loggedUserData = new Customer();
    alert('Logoff com Sucesso!');
  }
}
