<?php

    namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;

    class StoreCategories extends FormRequest
    {
        /**
         * Get the validation rules that apply to the request.
         *
         * @return array
         */
        public function rules()
        {
            return [
                'name'      => ['required'],
                'parent_id' => 'exists:categories,id'
            ];
        }

        public function messages()
        {
            return [
                'name.required' => 'Vous devez entrer un nom de catégorie.',
                'parent_id.exists' => 'Vous devez entrer une catégorie existante.',
            ];
        }
    }
