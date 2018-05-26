package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class join_room : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_join_room)

        val userText = findViewById<Button>(R.id.usernameText)
        val roomText = findViewById<Button>(R.id.roomText)
        val joinButton = findViewById<Button>(R.id.joinbtn)
        joinButton.setOnClickListener{
            val intent = Intent(this, room_settings::class.java)
            intent.putExtra("Username", userText.text.toString())
            intent.putExtra("RoomID", roomText.text.toString())
            startActivity(intent)
        }
    }
}
