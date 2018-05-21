import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { NoticeProvider } from '../notice/notice';
import { RequestOptions } from '@angular/http';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class NetworkProvider {
  serverAddr: string = "http://localhost/";
  /**
   * @name hideForm
   * @type {Boolean}
   * @public
   * @description     Flag to hide the form upon successful completion of remote operation
   */
  public hideForm: boolean = false;

  public userData: any = {
    userid: -1,
    username: '',
    useremail: '',
    userpassword: ''
  }

  // public crewArray: Array<any> = [];
  // public postArray: Array<any> = [];

  private PHP_GETKEY: any = {
    MYDATA_BY_EMAIL: "myDataByEmail",
    MYCREW_LIST: "myCrewList",
    CREWDATA_BY_INDEX: "crewDataByIndex",
    MYPOST_LIST_IN_CREW: "myPostListInCrew",
    MYPOST_LIST: "myPostList"
  }

  constructor(public http: HttpClient,
    private platform: Platform,
    private noticeProvider: NoticeProvider) {
    console.log('Hello NetworkProvider Provider');
  }

  crewAdd(userid, name, description, img) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "name": name,
        "description": description,
        "img": img,
        "userid": userid
      };

      this.post("crewUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          this.noticeProvider.floatingNotice(`동아리 ${name}가 성공적으로 생성되었습니다.`);
          resolve();
        } else {
          this.noticeProvider.floatingNotice('동아리 생성 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  crewList() {
    console.log('crew list load request');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.MYCREW_LIST, "crewData.php", ('userid=' + this.userData.userid)).then((data: any) => {
        console.log('crew list load complete');
        // this.crewArray = data;
        resolve(data);
      }, (err) => {
        console.log('crewList() error : ' + err.message);
        reject(err);
      });
    });
  }

  crewDataByIndex(crewid) {
    console.log('crew data load by index');
    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.CREWDATA_BY_INDEX, "crewData.php", ('id=' + crewid)).then((data: any) => {
        console.log('crew data load complete');
        resolve(data);
      }, (err) => {
        console.log('crewDataByIndex() error : ' + err.message);
        reject(err);
      });
    });
  }

  signup(name, email, password) {
    let options: any = {
      "key": "create",
      "username": name,
      "useremail": email,
      "userpassword": password
    };

    this.post("userUpdate.php", options).then((res: any) => {
      if (res.result = 'success') {
        this.noticeProvider.floatingNotice(`${name}님 환영합니다.`);

        this.userData.userid = Number(res.userid);
        this.userData.username = name;
        this.userData.useremail = email;
        this.userData.userpassword = password;

        console.dir(this.userData);
      } else {
        this.noticeProvider.floatingNotice('회원가입 에러');
      }
    }, (err) => {
      console.log('post-err:' + JSON.stringify(err));
      this.noticeProvider.floatingNotice('서버 통신 에러');
    });
  }

  userDataByEmail() {
    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.MYDATA_BY_EMAIL, "userData.php", ('useremail=' + this.userData.useremail)).then((data: any) => {

        this.userData = data;
        console.log(this.userData);
        resolve();
        // console.log(this.userData.userid);
        // console.log(this.userData.username);
        // console.log(this.userData.useremail);
        // console.log(this.userData.userpassword);

      }, (err) => {
        console.log('userDataByEmail() error : ' + err.message);
        reject();
      });
    });
  }

  writing(userid, crewid, username, useremail, content, attachment, crewname) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "userid": userid,
        "crewid": crewid,
        "username": username,
        "useremail": useremail,
        "content": content,
        "attachment": attachment,
        "crewname": crewname
      };

      console.log(options);

      this.post("postUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          this.noticeProvider.floatingNotice('게시물이 성공적으로 등록되었습니다.');
          resolve();
        } else {
          this.noticeProvider.floatingNotice('게시물 등록 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = a.getMonth();
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = hour > 12 ? hour - 12 : hour;
    let noon = hour > 12 ? '오후' : '오전';
    let fulltime = year + '년 ' + month + '월 ' + date + '일 ' + noon + ' ' + time + ':' + min;
    return fulltime;
  }

  postListInCrew(crewid) {
    console.log('post list in crew load request'); 

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.MYPOST_LIST_IN_CREW, "postData.php", ('crewid=' + crewid))
        .then((data: any) => {
        console.log('post list in crew load complete');

        for (let i = 0; i < data.length; i++) {
          data[i].content = data[i].content.replace(/&#10;/gi, "\n\r"); 
          data[i].date = this.timeConverter( data[i].date );
        }

        resolve(data);
      }, (err) => {
        console.log('postListInCrew() error : ' + err.message);
        reject(err);
      });
    });
  }

  postListAll() {
    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.MYPOST_LIST, "postData.php", ('userid=' + this.userData.userid))
        .then((data: any) => {
          
        console.log('all post list load complete');

        for (let i = 0; i < data.length; i++) {
          data[i].content = data[i].content.replace(/&#10;/gi, "\n\r"); 
          data[i].date = this.timeConverter( data[i].date );
        }

        resolve(data);
      }, (err) => {
        console.log('postListAll() error : ' + err.message);
        reject(err);
      });
    });
  }

  post(url, options) {
    return new Promise((resolve, reject) => {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        fullpath: any = "http://localhost/" + url;

      this.http.post(fullpath, JSON.stringify(options), headers)
        .subscribe((data: any) => {
          console.log(data);
          resolve(data);
        }, (error: any) => {
          console.log(error.message);
          console.log(error);
          reject(error);
        });
    });
  }

  get(key, url, params) {
    return new Promise((resolve, reject) => {
      // let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      let fullpath: any = "http://localhost/" + url;
      fullpath += '?' + "key=" + key + '&' + params;
      console.log('GET : ' + fullpath);
      this.http.get(fullpath)
        .subscribe((data: any) => {
          console.dir(data);
          resolve(data);

        }, (error: any) => {
          console.dir(error);
          reject(error);
        });
    });
  }

  /**
   * Manage notifying the user of the outcome of remote operations
   *
   * @public
   * @method sendNotification
   * @param message 	{String} 			Message to be displayed in the notification
   * @return {None}
   */


  // return new Promise((resolve, reject) => {
  //   let serverUrl;
  //   if (this.platform.is('cordova')) {
  //     console.log("this platform is cordova");
  //     serverUrl = this.serverAddr + url;
  //   } else {
  //     console.log("this platform is not cordova");
  //     serverUrl = "http://localhost/" + url;
  //   }
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http.post(serverUrl, body, { headers: headers }).subscribe((res: any) => {
  //     resolve(res);
  //   }, (err) => {
  //     reject(err);
  //   });
  // });
}