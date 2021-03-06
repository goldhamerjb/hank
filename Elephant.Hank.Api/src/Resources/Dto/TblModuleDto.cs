﻿// ---------------------------------------------------------------------------------------------------
// <copyright file="TblModuleDto.cs" company="Elephant Insurance Services, LLC">
//     Copyright (c) 2015 All Right Reserved
// </copyright>
// <author>Vyom Sharma</author>
// <date>2016-01-11</date>
// <summary>
//     The TblModuleDto class
// </summary>
// ---------------------------------------------------------------------------------------------------

namespace Elephant.Hank.Resources.Dto
{
    /// <summary>
    /// The TblModuleDto class
    /// </summary>
    public class TblModuleDto : BaseTableDto
    {
        /// <summary>
        /// Gets or sets the ModuleName
        /// </summary>
        public string ModuleName { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is executable.
        /// </summary>
        public bool IsExecutable { get; set; }
    }
}
