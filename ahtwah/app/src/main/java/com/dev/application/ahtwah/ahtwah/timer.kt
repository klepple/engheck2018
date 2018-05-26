package com.dev.application.ahtwah.ahtwah

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import kotlin.concurrent.fixedRateTimer

class timer : AppCompatActivity() {
    val TIMERLENGTH = 100
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_timer)
        var timer = findViewById<TextView>(R.id.timerView)
        var timeleft = TIMERLENGTH
        val myTimer = fixedRateTimer(
                name = "mytimer",
                initialDelay = 100,
                period = 1000
        ){
            runOnUiThread {
                timer.text = timeleft.toString()
            }
            timeleft -= 1
            if(timeleft <= 0) {
                this.cancel()
                runOnUiThread {
                    timer.text = "Expired"
                }
            }
        }
    }

}
