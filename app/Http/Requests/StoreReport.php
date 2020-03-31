<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReport extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'reason' => ['required'],
            'email' => ['required', 'email'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Vous devez entrer votre nom.',
            'reason.required' => 'Vous devez entrer la raison de votre signalement.',
            'email.required' => "Votre adresse courriel est d'un format invalide. Veuillez la vérifier.",
            'email.email' => "Votre adresse courriel est d'un format invalide. Veuillez la vérifier.",
        ];
    }
}
