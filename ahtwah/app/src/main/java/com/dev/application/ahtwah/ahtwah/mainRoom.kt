package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class mainRoom : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_room)
        val createButton = findViewById<Button>(R.id.createroombtn)
        val joinButton = findViewById<Button>(R.id.joinroombtn)
        createButton.setOnClickListener{
            val createIntent = Intent(this, create_room::class.java)
            startActivity(createIntent)
        }
        joinButton.setOnClickListener{
            val joinIntent = Intent(this, join_room::class.java)
            startActivity(joinIntent)
        }
    }
}
