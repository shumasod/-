Route::get('/', function () {
    $name = 'Laravel User';
    return view('welcome', compact('name'));
});

Route::get('/', function () {
    $data = ['name' => 'Laravel User', 'age' => 25];
    return view('welcome', $data);
});
