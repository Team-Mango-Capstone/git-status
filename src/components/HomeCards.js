import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

export function Timeline(props) {
  return (
    <div className="timeline">
      <h2>Your timeline</h2>
    </div>
  );
}

export function UsualCommitTime(props) {
  return (
    <div className="usual-commit-time">
      <h2>You seem commit the most on (day) at (time).</h2>
    </div>
  );
}

