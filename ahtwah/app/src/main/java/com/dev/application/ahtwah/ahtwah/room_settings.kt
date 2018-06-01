package com.dev.application.ahtwah.ahtwah

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONObject

class room_settings : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_room_settings)
        val username = getIntent().getStringExtra("username")
        val roomId = getIntent().getStringExtra("roomId")
        val time = getIntent().getStringExtra("time")
        val isHost = getIntent().getBooleanExtra("isHost", false)
        Log.d("nice", username.toString() + "_" + roomId.toString() + "_" + time.toString() + "_" + isHost.toString())
        val codeText = findViewById<TextView>(R.id.textView2)
        val timerText = findViewById<TextView>(R.id.textView)
        codeText.text = roomId
        timerText.text = time

        /*
        val queue = Volley.newRequestQueue(this)
        val url = "https://klepple.lib.id/ahtwah@dev/getConnectedUsers/"
        val JSON = JSONArray(mapOf("roomId" to roomId))
        val response = Response.Listener<JSONArray>{
            response ->
        }
        val error = Response.ErrorListener {
            error ->
            Log.d("Error", error.toString())
            Toast.makeText(this, "Error, Something went wrong.", Toast.LENGTH_LONG)
        }
        val StringRequest = JsonArrayRequest(Request.Method.POST, url, JSON, response, error)
        queue.add(StringRequest)
        */

        if(isHost) {
            val b = findViewById<Button>(R.id.StartButton)
            b.visibility = View.VISIBLE
            b.setOnClickListener{
                /*
                val queue = Volley.newRequestQueue(this)
                val url = "https://klepple.lib.id/ahtwah@dev/getActiveUser/"
                val JSON = JSONObject(mapOf("roomId" to roomId))
                val response = Response.Listener<JSONObject>{
                    response ->
                    val intent = Intent(this, timer::class.java)
                    intent.putExtra("roomId", roomId)
                    startActivity(intent)
                }
                val error = Response.ErrorListener {
                    error ->
                    Log.d("error", error.toString())
                }
                queue.add(JsonObjectRequest(Request.Method.POST, url, JSON, response, error))
                */
                val intent = Intent(this, timer::class.java)
                intent.putExtra("time", time)
                startActivity(intent)
            }
        }
    }
}
