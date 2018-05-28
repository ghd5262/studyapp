import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { CrewDetailPage } from '../crew-detail/crew-detail';

/**
 * Generated class for the CrewSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crew-search',
  templateUrl: 'crew-search.html',
})
export class CrewSearchPage {

  userData: any;
  crewCategoryList: any;
  newCrewList: any;
  recommendCrewList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider) {
    this.userData = networkProvider.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrewSearchPage');

    this.networkProvider.crewCategoryList().then((categoryList: any) => {
      this.crewCategoryList = categoryList;
    }, (err: any) => { });

    this.networkProvider.newCrewList(4).then((newCrewList: any) => {
      this.newCrewList = newCrewList;
    }, (err: any) => { });

    this.networkProvider.recommendCrewList(this.userData.userid, 4).then((recommendCrewList: any) => {
      this.recommendCrewList = recommendCrewList;
    }, (err: any) => { });
  }

  openCategory(categoryData) {

  }

  openCrewDetail(crewData) {
    this.networkProvider.crewDataByIndex(crewData.id).then((crewData: any) => {
      this.navCtrl.push(CrewDetailPage, { crewData: crewData });
    }, (err) => { })
  }
  // load(): any {
  //   if (this.data) {
  //     return Observable.of(this.data);
  //   } else {
  //     return this.http.get('assets/data/data.json')
  //       .map(this.processData, this);
  //   }
  // }

  // getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
  //   return this.load().map((data: any) => {
  //     let day = data.schedule[dayIndex];
  //     day.shownSessions = 0;

  //     queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
  //     let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

  //     day.groups.forEach((group: any) => {
  //       group.hide = true;

  //       group.sessions.forEach((session: any) => {
  //         // check if this session should show or not
  //         this.filterSession(session, queryWords, excludeTracks, segment);

  //         if (!session.hide) {
  //           // if this session is not hidden then this group should show
  //           group.hide = false;
  //           day.shownSessions++;
  //         }
  //       });

  //     });

  //     return day;
  //   });
  // }

  // filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

  //   let matchesQueryText = false;
  //   if (queryWords.length) {
  //     // of any query word is in the session name than it passes the query test
  //     queryWords.forEach((queryWord: string) => {
  //       if (session.name.toLowerCase().indexOf(queryWord) > -1) {
  //         matchesQueryText = true;
  //       }
  //     });
  //   } else {
  //     // if there are no query words then this session passes the query test
  //     matchesQueryText = true;
  //   }

  //   // if any of the sessions tracks are not in the
  //   // exclude tracks then this session passes the track test
  //   let matchesTracks = false;
  //   session.tracks.forEach((trackName: string) => {
  //     if (excludeTracks.indexOf(trackName) === -1) {
  //       matchesTracks = true;
  //     }
  //   });

  //   // if the segement is 'favorites', but session is not a user favorite
  //   // then this session does not pass the segment test
  //   let matchesSegment = false;
  //   if (segment === 'favorites') {
  //     if (this.user.hasFavorite(session.name)) {
  //       matchesSegment = true;
  //     }
  //   } else {
  //     matchesSegment = true;
  //   }

  //   // all tests must be true if it should not be hidden
  //   session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  // }

}
