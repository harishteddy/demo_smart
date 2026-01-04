package com.demo_smart

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

import io.hansel.hanselsdk.Hansel
import io.hansel.core.logger.HSLLogLevel
import com.netcore.android.Smartech
import java.lang.ref.WeakReference

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()

  Smartech.getInstance(WeakReference(this)).initializeSdk(this)
  Smartech.getInstance(WeakReference(applicationContext)).setDebugLevel(9)
   HSLLogLevel.all.setEnabled(true);
  HSLLogLevel.mid.setEnabled(true);
  HSLLogLevel.debug.setEnabled(true);



    loadReactNative(this)


  }
}
