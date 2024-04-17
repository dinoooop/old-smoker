<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function test(Request $request)
    {
        $data = [1, 2];
        $key = array_rand([0, 1]);
        echo $key;
    }
    public function index(Request $request)
    {
        $query = Post::query();
        
        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->filled('so')) {
            $data = $query->orderBy($request->sb, $request->so)->paginate();
        } else {
            $data = $query->orderBy('id', 'desc')->paginate();
        }
        return response()->json($data);
    }

    public function show(Request $request, $id)
    {
        $data = Post::findOrFail($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'status' => 'sometimes|boolean',
        ]);

        $data = Post::create($validated);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|boolean',
        ]);

        $data = Post::findOrFail($id)->update($validated);
        return response()->json($data);
    }

    public function destroy(Request $request, $id)
    {
        $data = Post::findOrFail($id)->delete();
        return response()->json($data);
    }
}
