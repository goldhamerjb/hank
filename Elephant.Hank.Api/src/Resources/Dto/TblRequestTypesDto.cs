﻿// ---------------------------------------------------------------------------------------------------
// <copyright file="TblRequestTypesDto.cs" company="Elephant Insurance Services, LLC">
//     Copyright (c) 2015 All Right Reserved
// </copyright>
// <author>Vyom Sharma</author>
// <date>2016-05-13</date>
// <summary>
//     The TblRequestTypesDto class
// </summary>
// ---------------------------------------------------------------------------------------------------

namespace Elephant.Hank.Resources.Dto
{
    /// <summary>
    /// The TblRequestTypesDto class
    /// </summary>
    public class TblRequestTypesDto : BaseTableDto
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is request body allowed.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance is request body allowed; otherwise, <c>false</c>.
        /// </value>
        public bool IsRequestBodyAllowed { get; set; }
    }
}
