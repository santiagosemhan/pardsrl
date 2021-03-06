<?php

namespace AppBundle\Event;

use AppBundle\Entity\Persona;
use Symfony\Component\EventDispatcher\Event;

/**
 * The order.placed event is dispatched each time an order is created
 * in the system.
 */
class PersonaEliminadaEvent extends Event
{
	const NAME = 'persona.eliminada';

	protected $persona;

	protected $plainPass;

	public function __construct(Persona $persona)
	{
		$this->persona = $persona;
	}

	public function getPersona()
	{
		return $this->persona;
	}
}