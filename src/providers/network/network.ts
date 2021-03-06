import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, ToastController, Thumbnail } from 'ionic-angular';
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
    userpassword: '',
    thumbnail: ''
  }

  // public crewArray: Array<any> = [];
  // public postArray: Array<any> = [];

  private PHP_GETKEY: any = {
    MYDATA_BY_EMAIL: "myDataByEmail",
    MYCREW_LIST: "myCrewList",
    CREWDATA_BY_INDEX: "crewDataByIndex",
    CREW_CATEGORY_LIST: "crewCategoryList", // 카테고리 메타리스트
    NEW_CREW_LIST: "newCrewList",
    CATEGORY_CREW_LIST: "categoryCrewList",
    RECOMMEND_CREW_LIST: "recommendCrewList",
    IS_CREW_MEMBER: "isCrewMember",
    CREW_APPLY_LIST: "crewApplyList",
    IS_CREW_LEADER: "isCrewLeader",
    CREW_MEMBER_COUNT: "crewMemberCount",
    COMMENT_LIST: "commentList",
    CREW_SCHEDULE_LIST: "scheduleList",
    SAVED_POST_LIST: "mySavedPostList",
    MYPOST_LIST_IN_CREW: "myPostListInCrew",
    MYPOST_LIST: "myPostList" 
  }

  constructor(public http: HttpClient,
    private platform: Platform,
    private noticeProvider: NoticeProvider) {
    console.log('Hello NetworkProvider Provider');
  }

  crewAdd(userid, name, description, img, categoryindex) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "name": name,
        "description": description,
        "img": img,
        "userid": userid,
        "categoryindex": categoryindex
      };

      this.post("crewUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          this.noticeProvider.floatingNotice(`스터디 ${name}가 성공적으로 생성되었습니다.`);
          resolve();
        } else {
          this.noticeProvider.floatingNotice('스터디 생성 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  crewJoin(userid, crewid, accept = false) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "update",
        "key2": accept ? "crewJoinAccept" : "crewJoinRefuse",
        "userid": userid,
        "crewid": crewid,
      };

      this.post("crewUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          // this.noticeProvider.floatingNotice(`스터디 ${name}가 성공적으로 생성되었습니다.`);
          resolve();
        } else {
          this.noticeProvider.floatingNotice('에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  crewApply(crewData) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "crewidto": crewData.id,
        "useridfrom": this.userData.userid
      };

      this.post("crewApplyUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          this.noticeProvider.floatingNotice(`스터디 ${crewData.name}에 가입신청을 보냈습니다.`);
          resolve();
        } else {
          this.noticeProvider.floatingNotice('가입신청 에러');
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
        console.log('crew data load complete : ');
        console.log(data);
        resolve(data);
      }, (err) => {
        console.log('crewDataByIndex() error : ' + err.message);
        reject(err);
      });
    });
  }

  crewCategoryList() {
    console.log('crew category list load request ');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.CREW_CATEGORY_LIST, "crewData.php").then((data: any) => {
        console.log('crew category list load complete');
        resolve(data);
      }, (err) => {
        console.log('crewCategoryList() error : ' + err.message);
        reject(err);
      });
    });
  }

  newCrewList(count) {
    console.log('new crew list load request ');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.NEW_CREW_LIST, "crewData.php", ('count=' + count)).then((data: any) => {
        console.log('new crew list load complete');
        resolve(data);
      }, (err) => {
        console.log('newCrewList() error : ' + err.message);
        reject(err);
      });
    });
  }

  categoryListByIndex(count, categoryindex) {
    console.log('category list load request ');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.CATEGORY_CREW_LIST, "crewData.php", ('count=' + count + '&categoryindex=' + categoryindex)).then((data: any) => {
        console.log('category list load complete');
        resolve(data);
      }, (err) => {
        console.log('categoryListByIndex() error : ' + err.message);
        reject(err);
      });
    });
  }

  isCrewMember(crewid) {
    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.IS_CREW_MEMBER, "crewData.php", ('userid=' + this.userData.userid + '&crewid=' + crewid)).then((data: any) => {
        // console.log(data.length);
        resolve(Boolean(data.length));
      }, (err) => {
        console.log('isCrewMember() error : ' + err.message);
        reject(err);
      });
    });
  }

  crewApplyList(crewid) {
    console.log('crew apply list load request');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.CREW_APPLY_LIST, "crewApplyData.php", ('crewid=' + crewid)).then((data: any) => {
        console.log('crew apply list load complete');
        resolve(data);
      }, (err) => {
        console.log('crewApplyList() error : ' + err.message);
        reject(err);
      });
    });
  }

  isCrewLeader(crewid) {
    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.IS_CREW_LEADER, "crewData.php", ('userid=' + this.userData.userid + '&crewid=' + crewid)).then((data: any) => {
        // console.log(data.length);
        resolve(Boolean(data.length));
      }, (err) => {
        console.log('isCrewLeader() error : ' + err.message);
        reject(err);
      });
    });
  }

  crewMemberCount(crewid) {
    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.CREW_MEMBER_COUNT, "crewData.php", ('crewid=' + crewid)).then((count: any) => {
        // console.log(data.length);
        resolve(count);
      }, (err) => {
        console.log('crewMemberCount() error : ' + err.message);
        reject(err);
      });
    });
  }

  recommendCrewList(userid, count) {
    console.log('recommend crew list load request ');

    return new Promise((resolve, reject) => {

      this.get(this.PHP_GETKEY.RECOMMEND_CREW_LIST, "crewData.php", ('userid=' + userid + '&count=' + count)).then((data: any) => {
        console.log('recommend crew list load complete');
        resolve(data);
      }, (err) => {
        console.log('recommend() error : ' + err.message);
        reject(err);
      });
    });
  }

  signup(name, email, password) {
    let thumbnail = "assets/imgs/profile_" + (Math.floor(Math.random() * (13 - 1 + 1)) + 1) + ".jpg";
    let options: any = {
      "key": "create",
      "username": name,
      "useremail": email,
      "userpassword": password,
      "thumbnail": thumbnail
    };

    this.post("userUpdate.php", options).then((res: any) => {
      if (res.result = 'success') {
        this.noticeProvider.floatingNotice(`${name}님 환영합니다.`);

        this.userData.userid = Number(res.userid);
        this.userData.username = name;
        this.userData.useremail = email;
        this.userData.userpassword = password;
        this.userData.thumbnail = thumbnail;

        console.dir(this.userData);
      } else {
        this.noticeProvider.floatingNotice('회원가입 에러');
      }
    }, (err) => {
      console.log('post-err:' + JSON.stringify(err));
      this.noticeProvider.floatingNotice('서버 통신 에러');
    });
  }

  userDataByEmail(email) {
    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.MYDATA_BY_EMAIL, "userData.php", ('useremail=' + email)).then((data: any) => {

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

  writing(userid, crewid, content, attachment) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "userid": userid,
        "crewid": crewid,
        "content": content,
        "attachment": attachment
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
          // console.log(data);
          console.log('post list in crew load complete');

          for (let i = 0; i < data.length; i++) {
            data[i].content = data[i].content.replace(/&#10;/gi, "\n\r");
            data[i].date = this.timeConverter(data[i].date);
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

          console.log(data);
          console.log('all post list load complete');

          for (let i = 0; i < data.length; i++) {
            data[i].content = data[i].content.replace(/&#10;/gi, "\n\r");
            data[i].date = this.timeConverter(data[i].date);
          }

          resolve(data);
        }, (err) => {
          console.log('postListAll() error : ' + err.message);
          reject(err);
        });
    });
  }

  writeComment(crewid, postid, content) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "userid": this.userData.userid,
        "crewid": crewid,
        "postid": postid,
        "content": content
      };

      console.log(options);

      this.post("commentUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          this.noticeProvider.floatingNotice('댓글이 성공적으로 등록되었습니다.');
          resolve();
        } else {
          this.noticeProvider.floatingNotice('댓글 등록 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  commentListByPost(postid) {
    console.log("commentListByPost called");

    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.COMMENT_LIST, "commentData.php", ('postid=' + postid))
        .then((data: any) => {

          console.log(data);
          console.log('all comment list load complete');

          for (let i = 0; i < data.length; i++) {
            data[i].content = data[i].content.replace(/&#10;/gi, "\n\r");
            data[i].date = this.timeConverter(data[i].date);
          }

          resolve(data);
        }, (err) => {
          console.log('commentListByPost() error : ' + err.message);
          reject(err);
        });
    });
  }

  crewScheduleAdd(crewid, data) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "crewid": crewid,
        "title": data.title,
        "starttime": data.startTime.toString(),
        "endtime": data.endTime.toString(),
        "allday": data.allDay,
        "color": data.color
      };

      console.log(options);

      this.post("crewScheduleUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          resolve();
        } else {
          this.noticeProvider.floatingNotice('일정 등록 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  scheduleList(crewid) {
    console.log("scheduleList called");

    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.CREW_SCHEDULE_LIST, "crewScheduleData.php", ('crewid=' + crewid))
        .then((data: any) => {

          console.log(data);
          console.log('all crew schedule list load complete');

          resolve(data);
        }, (err) => {
          console.log('commentListByPost() error : ' + err.message);
          reject(err);
        });
    });
  }

  // deleteSingleData(php, table, id) {
  //   return new Promise((resolve, reject) => {
  //     let options: any = {
  //       "key": "delete",
  //       "id": id,
  //       "table": table
  //     };

  //     console.log(options);

  //     this.post(php, options).then((res: any) => {
  //       if (res.result = 'success') {
  //         resolve();
  //         this.noticeProvider.floatingNotice('성공적으로 삭제되었습니다.');
  //       } else {
  //         this.noticeProvider.floatingNotice('삭제 에러');
  //       }
  //     }, (err) => {
  //       console.log('post-err:' + JSON.stringify(err));
  //       this.noticeProvider.floatingNotice('서버 통신 에러');
  //     });
  //   });
  // }

  deletePost(id) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "delete",
        "id": id
      };

      console.log(options);

      this.post("postUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          resolve();
          this.noticeProvider.floatingNotice('게시글이 성공적으로 삭제되었습니다.');
        } else {
          this.noticeProvider.floatingNotice('삭제 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  deleteComment(id) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "delete",
        "id": id
      };

      console.log(options);

      this.post("commentUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          resolve();
          this.noticeProvider.floatingNotice('댓글이 성공적으로 삭제되었습니다.');
        } else {
          this.noticeProvider.floatingNotice('삭제 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  savePost(postid) {
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "create",
        "userid": this.userData.userid,
        "postid": postid,
      };

      console.log(options);

      this.post("savedPostUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          resolve();
          this.noticeProvider.floatingNotice('저장되었습니다.');
        } else {
          this.noticeProvider.floatingNotice('게시물 저장 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
      });
    });
  }

  savedPostList() {
    console.log("savedPostList called");

    return new Promise((resolve, reject) => {
      this.get(this.PHP_GETKEY.SAVED_POST_LIST, "savedPostData.php", ('userid=' + this.userData.userid))
        .then((data: any) => {

          console.log(data);
          console.log('all saved post list load complete');

          for (let i = 0; i < data.length; i++) {
            data[i].content = data[i].content.replace(/&#10;/gi, "\n\r");
            data[i].date = this.timeConverter(data[i].date);
          }

          resolve(data);
        }, (err) => {
          console.log('savedPostList() error : ' + err.message);
          reject(err);
        });
    });
  }

  savedPostCancel(postid){
    return new Promise((resolve, reject) => {
      let options: any = {
        "key": "delete",
        "postid": postid
      };

      console.log(options);

      this.post("savedPostUpdate.php", options).then((res: any) => {
        if (res.result = 'success') {
          resolve();
          this.noticeProvider.floatingNotice('취소되었습니다.');
        } else {
          this.noticeProvider.floatingNotice('삭제 에러');
        }
      }, (err) => {
        console.log('post-err:' + JSON.stringify(err));
        this.noticeProvider.floatingNotice('서버 통신 에러');
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

  get(key, url, params = "") {
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