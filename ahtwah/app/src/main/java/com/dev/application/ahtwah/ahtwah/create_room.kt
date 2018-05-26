package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class create_room : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)
        val createButton = findViewById<Button>(R.id.createbtn)
        createButton.setOnClickListener{
            val roomSettingsIntent = Intent(this,room_settings::class.java)
            startActivity(roomSettingsIntent)
        }
    }
}
