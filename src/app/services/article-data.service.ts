import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  constructor(private http: HttpClient) { }
  articles= [
    {
      name: "Dell Inspiron",
      publisher: "Abhsishek Rathore",
      description: "Let's Talk about...",
      image: "assets/img/laptop.jpg",
      essay: " Dell BIOS updates released recently are reportedly causing boot issues on various laptop and desktop models. According to customer complaints on the company's community website, installing the latest BIOS updates for some Latitude laptops and Dell Inspiron and Alienware Aurora desktops will prevent the machines from booting. The company is yet to acknowledge the issues posted by the users, but some customers have reportedly managed to downgrade the BIOS, as an unofficial fix.The complaints shared by users on Dell forums were first spotted by Bleeping Computer, and the BIOS update issue appears to affect Dell Latitude 5320 and Latitude 5520 laptops (with version 1.14.3), as well as Dell Inspiron 5680 (version 2.8.0) and Alienware Aurora R8 (version 1.0.18) desktops. Installing BIOS updates to these versions can apparently cause booting issues on these laptops and desktops. A user on the company's community website posted that their Dell Latitude 5320 would not boot after updating to the latest BIOS version 1.14.3. The laptop's power button will light up for a few seconds and shut off again, as per the user. The user states that they were able to see a blue screen or an error screen that says “Time-of-day not set — please run SETUP program” before shutting down. The issue was also shared on Reddit, while webpage for the issue currently states that 11 other users also had this problem, including another user with a Dell Latitude 5520 laptop. The BIOS update also appears to have affected some desktop owners as well, including the Alienware Aurora R8 desktop, according to the report. A user on the forums states that their Aurora R8 desktop automatically rebooted while in Virtual Reality mode. The user states that they have been experiencing a Blue Screen of Death (BSOD) when booting, and cannot enter recovery mode, or boot from a recovery USB or Ubuntu USB. An Inspiron 5680 user on Reddit also states that they could not boot their PC after installing Dell system updates, but restarting and performing a disk repair appeared to have resolved the issue. Dell is yet to acknowledge the issues posted by the users on the community forums. Gadgets 360 has reached out to the company for a comment on the complaints and will update this space when we receive a response. Meanwhile, users have managed to find their own temporary solutions — including downgrading the BIOS. One workaround shared by a user, who was affected by the latest BIOS update is to use the Dell SupportAssist OS Recovery to downgrade their computers. According to another workaround shared by a Dell user, affected users can try disconnecting the battery and charger of their laptops and then pressing the power button for 15 seconds before booting their laptop."
    },
    {
      name: "Steam Deck",
      publisher: "Abhsishek Rathore",
      description: "New face of gaming...",
      image: "assets/img/steam.jpg",
      essay: "sample2"
    },
    {
      name: "Wild Gaming!",
      publisher: "Abhsishek Rathore",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    },
    {
      name: "Wild Gaming2!",
      publisher: "Abhsishek Rathore",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    },
    {
      name: "Wild Gaming2!",
      publisher: "Abhsishek Rathore",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    },
    {
      name: "Wild Gaming2!",
      publisher: "Abhsishek Rathore",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    }
  ];

  getArticles() : Observable<any> {
      return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/articles.json')   
  }

  getArticle(index: number) {
    return this.articles[index-1];
  }
}

