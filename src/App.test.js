import React from 'react';
import axios from 'axios'
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';

import App from './App';

jest.mock('axios')

const mockGet = {
  data: {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/'
        }
      },
        {
        slot: 2,
        type: {
          name: 'poison',
          url: 'https://pokeapi.co/api/v2/type/4/'
        }
      }
    ],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      },
    ],
    moves: [
      {
        move: {
          name: 'razor-wind',
          url: 'https://pokeapi.co/api/v2/move/13/'
        },
        version_group_details: [
          {
            level_learned_at: 0,
            move_learn_method: {
              name: 'egg',
              url: 'https://pokeapi.co/api/v2/move-learn-method/2/'
            }
          }
        ]
      }
    ]
  }
}

describe('App component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
    const mockAxiosGet = jest.fn(() => Promise.resolve(mockGet))
    axios.get.mockImplementation(mockAxiosGet)
  })
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders information', async () => {
    const mockGet = jest.fn(() => Promise.resolve(mockGet))
    axios.get.mockImplementation(mockGet)

    render(<App />);

    //await waitFor(() => expect(screen.getAllByText('bulbasaur')[0]).toBeInTheDocument());
  })
})
