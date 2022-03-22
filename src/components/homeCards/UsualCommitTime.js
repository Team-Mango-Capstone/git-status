import React, { useState, useEffect } from "react";
import axios from "axios";

const githubUsername = localStorage.getItem("screenName");

export function UsualCommitTime(props) {
  return (
    <div className="usual-commit-time">
      <h2>You seem to commit the most on (day) at (time).</h2>
    </div>
  );
}

