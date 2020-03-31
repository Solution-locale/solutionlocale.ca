<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUsers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUsers $request)
    {
        // Filter out invalid roles
        $roles = array_intersect(Role::all()->pluck('name')->toArray(), $request->roles);

        // Create user (with invalid password)
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => '-'
        ]);

        $user->save();

        $user->assignRole($roles);

        // Send password reset link
        Password::sendResetLink(['email' => $user->email]);

        return redirect()->route('users.create')
            ->with('status', 'Utilisateur créé. Courriel de réinitialisation du mot de passe envoyé.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        if (Auth::user()->id != $user->id) {
            abort(401);
        }

        return view('users.edit')->with(['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if (Auth::user()->id != $user->id) {
            abort(401);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->back()->with('status', 'Profil modifié!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
