import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginOptionPage } from '../pages/login-option/login-option';
import { LoginProvider } from '../providers/login/login';
import { TabPage } from '../pages/tab/tab';
import { ProfilePage } from '../pages/profile/profile';
import { SaveListPage } from '../pages/save-list/save-list';
import { MessagePage } from '../pages/message/message';
import { PostRagistrationPage } from '../pages/post-ragistration/post-ragistration';
import { CrewRagistrationPage } from '../pages/crew-ragistration/crew-ragistration';
import { HttpModule } from '@angular/http';
import { NetworkProvider } from '../providers/network/network';
import { HttpClientModule } from '@angular/common/http';
import { PostPage } from '../pages/post/post';
import { NoticeProvider } from '../providers/notice/notice';
import { RequestToCrewProvider } from '../providers/request-to-crew/request-to-crew';
import { CrewProvider } from '../providers/crew/crew';
import { CrewDetailPage } from '../pages/crew-detail/crew-detail';
import { WritingPage } from '../pages/writing/writing';
import { PictureProvider } from '../providers/picture/picture';
import { CrewSearchPage } from '../pages/crew-search/crew-search';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { CrewInvitePage } from '../pages/crew-invite/crew-invite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    WelcomePage,
    LoginOptionPage,
    TabPage,
    ProfilePage,
    SaveListPage,
    MessagePage,
    PostRagistrationPage,
    CrewRagistrationPage,
    PostPage,
    CrewDetailPage,
    WritingPage,
    CrewSearchPage,
    PostDetailPage,
    CrewInvitePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    WelcomePage,
    LoginOptionPage,
    TabPage,
    ProfilePage,
    SaveListPage,
    MessagePage,
    PostRagistrationPage,
    CrewRagistrationPage,
    PostPage,
    CrewDetailPage,
    WritingPage,
    CrewSearchPage,
    PostDetailPage,
    CrewInvitePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoticeProvider,
    LoginProvider,
    NetworkProvider,
    RequestToCrewProvider,
    CrewProvider,
    Camera,
    PictureProvider
  ]
})
export class AppModule {}
