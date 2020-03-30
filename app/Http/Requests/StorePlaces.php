<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlaces extends FormRequest
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
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $data = $this->input();
        $isDeliveryTypeSet = isset($data['deliveryType']);

        $this->merge([
            'addressjson' => json_decode($this->input('addressjson'), true),
            'deliveryType' => $isDeliveryTypeSet ? $this->input('deliveryType') : null,
        ]);
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
            'addressjson.name' => ['required'],
            'addressjson.city' => ['required'],
            'categories' => ['required'],
            'deliveryType' => ['required'],
            'placeType' => ['required'],
            'region_id' => ['required'],
            'email' => ['nullable', 'email'],
            'url' => ['nullable', 'url'],
            'hide_address' => ['boolean'],
            'phoneNumber' => ['nullable', 'phone:CA'],
            'additionnalPhoneNumber' => ['nullable', 'phone:CA'],
            'deliveryZone' => [
                function ($attribute, $value, $fail) {
                    $is_house_delivery = ! is_null($this->input('deliveryType')) && in_array('2', $this->input('deliveryType'));

                    if (empty($value) && $is_house_delivery) {
                        $fail('Comme vous offrez la livraison à domicile, vous devez renseigner le secteur desservi.');
                    }

                    if (! $is_house_delivery && ! is_null($this->input('deliveryZone'))) {
                        $fail("Le champs « secteur desservi pour la livraison à domicile » ne doit être utilisé que si l'option « Livraison à domicile sans contact » est sélectionnée.");
                    }
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Vous devez entrer le nom de votre entreprise.',
            'addressjson.name.required' => "Il semble avoir un problème avec l'adresse donnée. Si ce problème persiste, veuillez nous contacter via notre page Facebook",
            'addressjson.city.required' => "Il semble avoir un problème avec l'adresse donnée, spécifiquement la ville. Si ce problème persiste, veuillez nous contacter via notre page Facebook",
            'categories.required'  => 'Vous devez choisir une catégorie.',
            'deliveryType.required'  => 'Vous devez choisir un mode de distribution.',
            'placeType.required'  => 'Vous devez choisir un type d\'entreprise.',
            'email.email' => "Votre adresse courriel est d'un format invalide. Veuillez la vérifier.",
            'url.url' => "Veuillez vous assurer d'avoir une adresse valide et complète, incluant les <em>http://</em> ou <em>https://</em>.",
            'phoneNumber.phone' => "Assurez vous d'avoir un format de téléphone valide, inclant le code régional.",
            'additionnalPhoneNumber.phone' => "Assurez vous d'avoir un format de téléphone valide, inclant le code régional.",
        ];
    }
}
