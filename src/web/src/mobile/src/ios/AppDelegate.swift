import UIKit
import UserNotifications // For handling push notifications (iOS SDK)
import FirebaseCore // Firebase SDK for initializing Firebase services
import FirebaseMessaging // Firebase Messaging for push notifications
// Firebase SDK version 8.10.0

// AppDelegate.swift
// Description: Application delegate responsible for handling app lifecycle events and push notification configurations
// Addresses Requirements:
// - TR-F008.2 Implement push notifications for expense status updates and policy reminders
//   Location: Technical Specification/13. Features/13.8 Mobile Features/TR-F008.2

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    // MARK: - Application Lifecycle Methods

    // Called when the application has finished launching
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {

        // Initialize Firebase SDK
        FirebaseApp.configure()
        // Comment: Firebase initialization is required for push notification services
        // Dependency: FirebaseCore version 8.10.0
        // Purpose: Initialize Firebase services to enable messaging and analytics

        // Configure push notifications
        configurePushNotifications(application)

        return true
    }

    // MARK: - Push Notification Configuration

    private func configurePushNotifications(_ application: UIApplication) {
        // Request user's permission for push notifications
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                // Register for remote notifications on the main thread
                DispatchQueue.main.async {
                    application.registerForRemoteNotifications()
                }
            } else {
                // Handle the case when the user denies permissions
                print("Push notifications permission denied.")
            }
        }

        // Enable Firebase Messaging delegate
        Messaging.messaging().delegate = self
    }

    // MARK: - APNs Registration

    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        // Pass device token to Firebase Messaging
        Messaging.messaging().apnsToken = deviceToken
        // Comment: Passing the APNs device token to Firebase Messaging to enable push notifications
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // Handle failure to register with APNs
        print("Failed to register for remote notifications: \(error.localizedDescription)")
    }
}

// MARK: - UNUserNotificationCenterDelegate

extension AppDelegate: UNUserNotificationCenterDelegate {

    // Called when a notification is received while the app is in the foreground
    // Addresses Requirement TR-F008.2
    // Location: Technical Specification/13. Features/13.8 Mobile Features/TR-F008.2
    // Description: Implement push notifications for expense status updates and policy reminders
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        // Show the notification as a banner and play a sound
        completionHandler([.alert, .sound, .badge])
    }

    // Called when the user interacts with a notification
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        // Process the notification content
        let userInfo = response.notification.request.content.userInfo
        // Handle the notification data as needed (e.g., navigate to a specific screen)
        completionHandler()
    }
}

// MARK: - MessagingDelegate

extension AppDelegate: MessagingDelegate {

    // Receives the FCM registration token
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        print("Firebase registration token: \(String(describing: fcmToken))")
        // TODO: Send token to application server to enable targeted push notifications
        // Addresses Requirement TR-F008.2
        // Location: Technical Specification/13. Features/13.8 Mobile Features/TR-F008.2
    }

    // Receives data messages while the app is in the foreground
    func messaging(_ messaging: Messaging, didReceive remoteMessage: MessagingRemoteMessage) {
        // Handle the data message
        print("Received data message: \(remoteMessage.appData)")
    }
}