import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import NotificationsMixin from 'open-event-frontend/mixins/notifications';

@classic
export default class AllController extends Controller.extend(NotificationsMixin) {
  
  @computed('model.notifications', 'model.unread')
  get showMarkAllRead() {  
    console.log('s5ouunaaa');
    console.log("get chey7a item", item.get('created-at'))
    console.log(JSON.parse(JSON.stringify(this.model)));  // Log notifications
    /* this.model.notifications.forEach(item => {
      console.log('nottttttttttif', item); 
    }); */

    return this.model.notifications.length > 0 && this.model.unread;
  }

}
