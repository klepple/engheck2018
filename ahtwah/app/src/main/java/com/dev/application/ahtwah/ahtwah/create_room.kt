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
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class create_room : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_room)
        val createButton = findViewById<Button>(R.id.joinbtn)
        val nameField = findViewById<EditText>(R.id.usernameText)
        val timeField = findViewById<EditText>(R.id.roomText)
        createButton.setOnClickListener{
            val queue = Volley.newRequestQueue(this)
            val url = "https://klepple.lib.id/ahtwah@dev/createRoom/"
            val JSON = JSONObject(mapOf("username" to nameField.text.toString(), "totalTime" to timeField.text.toString().toInt()))
            val gameText = findViewById<EditText>(R.id.roomText)
            val nameText = findViewById<EditText>(R.id.usernameText)

            val response = Response.Listener<JSONObject>{
                response ->
                val code = response.get("roomId").toString()
                Log.d("nice", code)
                val intent = Intent(this, room_settings::class.java)
                intent.putExtra("roomId", code)
                intent.putExtra("username", nameText.text.toString())
                intent.putExtra("time", gameText.text.toString())
                intent.putExtra("isHost", true)
                startActivity(intent)
            }
            val error = Response.ErrorListener {
                error ->
                Log.d("Error", error.toString())
                Toast.makeText(this, "Error, Something went wrong.", Toast.LENGTH_LONG)
            }
            val StringRequest = JsonObjectRequest(Request.Method.POST, url, JSON, response, error)
            queue.add(StringRequest)
        }
    }
}
