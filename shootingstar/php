<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FlowingStarController extends Controller
{
  public function data()
  {
    // スプレッドシートとの連携
    $sheets = GoogleSheets::sheets();
    $spreadsheet = $sheets->spreadsheets->get('YOUR_SPREADSHEET_ID');
    $values = $spreadsheet->values->get('Sheet1!A:F');

    // データの処理
    $data = [];
    foreach ($values as $row) {
      $data[] = [
        'datetime' => $row[0],
        'azimuth' => $row[1],
        'altitude' => $row[2],
        'magnitude' => $row[3],
        'duration' => $row[4],
        'color' => $row[5],
      ];
    }

    return response()->json($data);
  }
}
