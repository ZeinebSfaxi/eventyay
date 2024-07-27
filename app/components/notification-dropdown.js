import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import $ from 'jquery';
import Component from '@ember/component';

@classic
@classNames('notification item')
@tagName('a')
export default class NotificationDropdown extends Component {
  unreadNotifications = [];

  async didInsertElement() {
    this._super.call(this);
    if (this.authManager.currentUser) {
      try {
        const notifications = await this.authManager.currentUser.query('notifications', {
          filter: [
            {
              name : 'is-read',
              op   : 'eq',
              val  : false
            }
          ],
          sort: '-created-at'
        });
        this.set('unreadNotifications', notifications);
      } catch (e) {
        console.warn(e);
        this.session.invalidate();
      }
    }
    $(this.element).popup({
      popup : '.popup',
      on    : 'click'
    });
  }

  willDestroyElement() {
    this._super.call(this);
    $(this.element).popup('destroy');
  }

  @action
  markRead(notification) {
    notification.set('isRead', true);
    notification.save()
      .then(() => {
        this.notify.success(this.l10n.t('Marked as Read successfully'), {
          id: 'not_read_succ'
        });
      })
      .catch(e => {
        console.error('Error while marking notifications as read.', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
          id: 'not_read_error'
        });
      });
  }

  @action
  markAllRead() {
    this.authManager.currentUser.get('notifications')
      .then(data => {
        console.log("eeeeeeeeeeeeeeeeeeeeeee data")
        console.dir( data);
        data.forEach(item => {
          console.log( item.get(0))
          console.log( item.get('id'))
          console.log( item.get('title'))
          console.log( item.get('message'))
          console.log( item.get('receivedAt'))
            
          if (!item.get('isRead')) {
            item.set('isRead', true);
            item.save();
          }
        });
      });
  }
}
