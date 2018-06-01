package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import org.json.JSONObject
import kotlin.concurrent.fixedRateTimer

class timer : AppCompatActivity() {
    val TIMERLENGTH = 100
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_timer)

//        val roomId = getIntent().getStringExtra("roomId")
//        var timer = findViewById<TextView>(R.id.timerView)
        var stopButton = findViewById<Button>(R.id.stopButton)
        var activePlayer = false
//        var timeleft = TIMERLENGTH
        stopButton.setOnClickListener{
            activePlayer = false
        }
//
//        val url = "https://klepple.lib.id/ahtwah@dev/nextUserTurn"
//        val JSON = JSONObject(mapOf("roomId" to roomId))

        var timeleft = getIntent().getStringExtra("time").toInt()
        val timer = findViewById<TextView>(R.id.timerView)
        val myTimer = fixedRateTimer(
                name = "mytimer",
                initialDelay = 100,
                period = 1000
        ){
            runOnUiThread {
                timer.text = timeleft.toString()
                if(timeleft < 1){
                    timer.text = "YOU LOSE!!! GAME OVER"
                    this.cancel()
                }
            }
            timeleft -= 1


//            if(activePlayer){
//                timeleft -= 1
//                stopButton.visibility = View.VISIBLE
//            } else {
//                stopButton.visibility = View.INVISIBLE
//            }
//
        }
    }
}
