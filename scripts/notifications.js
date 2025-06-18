class NotificationSystem {
    constructor() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.id = 'notification-container';
        document.body.appendChild(this.notificationContainer);
    }

    show(message, type = 'info', duration = 10000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        this.notificationContainer.appendChild(notification);

        if (duration) {
            setTimeout(() => {
                notification.remove();
            }, duration);
        }

        return notification;
    }
}

const notifications = new NotificationSystem();