package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

class create_room : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)
        val createButton = findViewById<Button>(R.id.joinbtn)
        createButton.setOnClickListener{
            val queue = Volley.newRequestQueue(this)
            val url = "KAHLIA PLZ"
            val gameText = findViewById<EditText>(R.id.roomText)
            val nameText = findViewById<EditText>(R.id.usernameText)

            val response = Response.Listener<String>{
                response ->
                val code = "KAHLIA PLZ"
                val intent = Intent(this, room_settings::class.java)
                intent.putExtra("Roomcode", code)
                intent.putExtra("name", nameText.text.toString())
                intent.putExtra("Gametime", gameText.text.toString())
                startActivity(intent)
            }
            val error = Response.ErrorListener {
                error ->
                Log.d("Error", error.toString())
                Toast.makeText(this, "Error, Something went wrong.", Toast.LENGTH_LONG)
            }
            val StringRequest = StringRequest(Request.Method.GET, url, response, error)
            queue.add(StringRequest)
        }
    }
}
