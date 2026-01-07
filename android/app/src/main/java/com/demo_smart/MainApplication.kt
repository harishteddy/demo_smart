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
import android.view.View
import com.facebook.react.uimanager.util.ReactFindViewUtil
import io.hansel.react.HanselRn
import java.util.HashSet

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
  Smartech.getInstance(WeakReference(applicationContext)).trackAppInstallUpdateBySmartech()
  HSLLogLevel.all.setEnabled(true);
  HSLLogLevel.mid.setEnabled(true);
  HSLLogLevel.debug.setEnabled(true);

  val nativeIdSet: MutableSet<String> = HashSet()
  nativeIdSet.add("hansel_ignore_view_overlay")
  nativeIdSet.add("hansel_ignore_view")

  ReactFindViewUtil.addViewsListener(
    object : ReactFindViewUtil.OnMultipleViewsFoundListener {
        override fun onViewFound(view: View, nativeID: String) {
            if (nativeID == "hansel_ignore_view_overlay") {
                val values = view.tag.toString().split("#")
                val parentsLayerCount = values[0].toInt()

                val childLayerIndex = if (values.size < 2 || values[1].isEmpty()) {
                    0
                } else {
                    values[1].toInt()
                }

                HanselRn.setHanselIgnoreViewTag(
                    view,
                    parentsLayerCount,
                    childLayerIndex
                )
            } else {
                view.setTag(io.hansel.react.R.id.hansel_ignore_view, true)
            }
        }
    },
    nativeIdSet
)




    loadReactNative(this)


  }
}
