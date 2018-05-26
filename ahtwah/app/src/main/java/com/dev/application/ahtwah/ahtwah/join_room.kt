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
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class join_room : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_join_room)

        val userText = findViewById<EditText>(R.id.usernameText)
        val roomText = findViewById<EditText>(R.id.roomText)
        val joinButton = findViewById<Button>(R.id.joinbtn)
        joinButton.setOnClickListener{
            val queue = Volley.newRequestQueue(this)
            val url = "https://klepple.lib.id/ahtwah@dev/joinRoom/"
            val JSON = JSONObject(mapOf("username" to userText.text.toString(), "roomId" to roomText.text.toString()))
            val response = Response.Listener<JSONObject>{
                response ->
                val code = "aaaa"
                val intent = Intent(this, room_settings::class.java)
                intent.putExtra("Roomcode", code)
                intent.putExtra("Name", userText.text.toString())
                startActivity(intent)
            }
            val error = Response.ErrorListener {
                error ->
                Log.d("Error", error.toString())
                Toast.makeText(this, "Error, Something went wrong.", Toast.LENGTH_LONG)
            }
            val JsonObjectRequest = JsonObjectRequest(Request.Method.POST, url, JSON, response, error)
            queue.add(JsonObjectRequest)
            val JsonObjectRequest = 
            val intent = Intent(this, room_settings::class.java)
            intent.putExtra("Username", userText.text.toString())
            intent.putExtra("RoomID", roomText.text.toString())
            startActivity(intent)
        }
    }
}
