using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum ERoleUser
    {
        Colaborador = 1,
        Jefatura = 2,
    }
}