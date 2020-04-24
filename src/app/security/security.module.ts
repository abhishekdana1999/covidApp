import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { IonicModule } from "@ionic/angular";
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {path: '' ,component: AuthComponent},
  { path: "login", component: AuthComponent },
  { path: "register" , component: RegisterComponent},
  { path: "forgot" , component: ForgotComponent}
];

@NgModule({
  declarations: [AuthComponent , RegisterComponent , ForgotComponent],
  imports: [CommonModule, IonicModule, FormsModule,
    RouterModule.forChild(routes)],
})
export class SecurityModule {}
