-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 31 jan. 2021 à 21:36
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restn_vols`
--

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_vol` int(11) NOT NULL,
  `nombre_places` int(11) NOT NULL,
  `date_de_reservation` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `id_user`, `id_vol`, `nombre_places`, `date_de_reservation`) VALUES
(1, 1, 2, 1, ''),
(2, 2, 1, 1, ''),
(3, 3, 1, 1, ''),
(4, 4, 1, 1, ''),
(5, 5, 1, 1, '2021-01-27'),
(99, 100, 1, 1, '2021-01-31 15:20:44.341'),
(100, 101, 1, 1, '2021-01-31 15:43:55.338'),
(101, 102, 1, 1, '2021-01-31 16:02:34.238'),
(102, 103, 1, 1, '2021-01-31 16:03:24.687'),
(103, 104, 1, 1, '2021-01-31 16:03:28.912'),
(104, 105, 1, 1, '2021-01-31 16:04:36.026'),
(105, 106, 1, 1, '2021-01-31 16:05:42.336'),
(106, 107, 1, 1, '2021-01-31 16:28:44.891'),
(107, 108, 1, 1, '2021-01-31 16:30:15.920'),
(108, 109, 1, 1, '2021-01-31 16:36:49.069'),
(109, 110, 1, 1, '2021-01-31 19:07:50.734'),
(110, 111, 1, 1, '2021-01-31 19:15:29.746'),
(111, 112, 1, 1, '2021-01-31 19:17:49.345'),
(112, 113, 1, 1, '2021-01-31 19:19:11.202'),
(113, 114, 1, 1, '2021-01-31 19:20:26.691'),
(114, 115, 1, 1, '2021-01-31 20:34:58.027'),
(115, 116, 1, 1, '2021-01-31 20:42:18.147'),
(116, 117, 1, 1, '2021-01-31 20:45:41.704'),
(117, 118, 1, 1, '2021-01-31 20:46:06.278'),
(118, 119, 1, 1, '2021-01-31 20:46:35.252'),
(119, 120, 1, 1, '2021-01-31 20:48:12.672'),
(120, 121, 1, 1, '2021-01-31 20:51:00.780'),
(121, 122, 1, 1, '2021-01-31 20:51:26.711'),
(122, 123, 1, 1, '2021-01-31 21:02:44.205'),
(123, 124, 1, 1, '2021-01-31 21:04:51.722'),
(124, 125, 1, 1, '2021-01-31 21:05:45.039'),
(125, 126, 1, 1, '2021-01-31 21:07:07.576');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `prenom` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telephone` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `telephone`) VALUES
(1, 'ttnnn', 'ttpp', 'ttrh@gmail.com', '3322'),
(2, 'fsd', 'sfd', 'rh@gmail.com', '22'),
(3, 'fsd', 'sfd', 'rh@gmail.com', '22'),
(4, 'fsd', 'sfd', 'rh@gmail.com', '22'),
(5, 'sdsd', 'sdsdsdsd', 'sdsdsdsdrh@gmail.com', '222222'),
(6, 'HHN', 'HHP', 'HHrh@gmail.com', '1122'),
(7, 'rr', 'rr', 'rrh@gmail.com', '123'),
(8, 'D', 'D', 'rDh@gmail.com', '12'),
(9, 'D', 'D', 'rDh@gmail.com', '12'),
(10, 'othman', 'hannoune', 'othman@gmail.com', '0688888'),
(11, 'zainab', 'khaladi', 'zainab@gmail.com', '067787878'),
(12, 'CCVVV', 'CCVV', 'CCVVrh@gmail.com', '3322'),
(13, 'taoufiq', 'tpr', 'rhLLKJ@gmail.com', '3322'),
(14, 'taoufiq', 'tpr', 'ta@gmail.com', '22'),
(15, 'taoufiq', 'tpr', 'ta@gmail.com', '22'),
(16, 'abdelwaheddddd', 'tpr', 'rh@gmail.com', '3322'),
(17, 'abdelwaheddddd', 'tpr', 'rh@gmail.com', '3322'),
(18, 'taoufiq', 'tpr', 'rht1@gmail.com', '3322'),
(19, 'taoufiq', 'Mehdi33', 'rbbh@gmail.com', '3322'),
(20, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(21, 'taoufiq', 'tpr', 'ma@gmail.com', '3322'),
(22, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(23, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(24, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(25, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(26, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(27, 'taoufiq', 'Mehdi33', 'rh@gmail.com', '3322'),
(28, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(29, 'taoufiq', 'Mehdi33', 'rh@gmail.com', '3322'),
(30, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(31, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(32, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(33, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(34, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(35, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(36, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(37, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(38, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(39, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(40, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(41, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(42, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(43, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(44, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(45, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(46, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(47, 'abdelwaheddddd', 'tpr', 'rh@gmail.com', '3322'),
(48, 'jjj', 'Mehdi33', 'rh@gmail.com', '3322'),
(49, 'jjj', 'Mehdi33', 'rh@gmail.com', '3322'),
(50, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(51, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(52, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(53, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(54, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(55, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(56, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(57, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(58, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(59, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(60, 'taoufiq', 'tpr', 'rh@gmail.com', '3322'),
(61, 'aaaaaa', 'aaaaaaaa', 'OO@gmail.com', '09889898989'),
(62, 'rrrrrrrr', 'rrrrrrr', 'ahmed@jj.kk', '3333333333'),
(63, 'wwwww', 'wwwwww', 'wwww@wwww.com', '09889898989'),
(64, 'kiway', 'red', 'othmane@gmail.com', '09889898989'),
(65, 'qqq', 'qqq', 'qqqqqqqq@aa.aa', '09889898989'),
(66, 'kiway', 'red', 'othmanehannoune1@gmail.com', '09889898989'),
(67, 'qqqqqqqqq', 'qqqqqqq', 'othmane@gmail.com', '11111111'),
(68, 'XXXXXXXX', 'XXXXXXXX', 'OO@gmail.com', '123211221'),
(69, 'kiway', 'red', 'OO@gmail.com', '3333333333'),
(70, 'aaaaaaa', 'aaaaaaa', 'ahmed@jj.kk', '11111111'),
(71, 'kiway', 'red', 'othmane@gmail.com', '09889898989'),
(72, 'cawazakis', 'red', 'othmane@gmail.com', '9999999999'),
(73, 'kiway', 'red', 'othmane@gmail.com', '1111111111111111'),
(74, 'qqqqq', 'qqqq', 'othmanehannoune1@gmail.com', '111'),
(75, 'kiway', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(76, 'ssss', 'ssssss', 'othmanehannoune1@gmail.com', '9999999999'),
(77, 'ghizlan', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(78, 'qqqqq', 'qqqq', 'othmanehannoune1@gmail.com', '11111111'),
(79, 'cawazaki', 'red', 'othmanehannoune1@gmail.com', '3333333333'),
(80, 'kiway', 'red', 'othmanehannoune1@gmail.com', '3333333333'),
(81, 'howwoh', 'woooo', 'OO@gmail.com', '12345'),
(82, 'cawazaki', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(83, 'Safi', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(84, 'Safi', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(85, 'Safi', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(86, 'Safi', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(87, 'kiway', 'red', 'othmanehannoune1@gmail.com', '09889898989'),
(88, 'WQAWQWA', 'WQWAW', 'othmanehannoune1@gmail.com', '11111111'),
(89, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(90, 'kiway', 'red', 'othmanehannoune1@gmail.com', '3333333333'),
(91, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(92, 'Safi', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(93, 'aaaaa', 'red', 'othmanehannoune1@gmail.com', '3333333333'),
(94, 'cawazaki', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(95, 'kiway', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(96, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(97, 'kiway', 'red', 'othmanehannoune1@gmail.com', '3333333333'),
(98, 'kiway', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(99, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(100, 'qqqqq', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(101, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(102, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(103, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(104, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(105, 'ZZZZ', 'ZZZ', 'othmanehannoune1@gmail.com', '3333333333'),
(106, 'kiway', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(107, 'kiway', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(108, 'kiway', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(109, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1111111111111111'),
(110, 'Safi', 'red', 'othmanehannoune1@gmail.com', '9999999999'),
(111, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(112, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(113, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(114, 'kiway', 'red', 'othmanehannoune1@gmail.com', '1231223'),
(115, 'othmane', 'hannonune', 'othmanehannoune1@gmail.com', '0616855202'),
(116, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(117, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(118, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(119, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(120, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(121, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(122, 'hannoune', 'othmane', 'othmanehannoune1@gmail.com', '09889898989'),
(123, 'scoter', 'jhjhjh', 'othmanehannoune1@gmail.com', '3333333333'),
(124, 'kiway', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(125, 'kiway', 'red', 'othmanehannoune1@gmail.com', '11111111'),
(126, 'cawazaki', 'red', 'othmanehannoune1@gmail.com', '3333333333');

-- --------------------------------------------------------

--
-- Structure de la table `vols`
--

CREATE TABLE `vols` (
  `id` int(11) NOT NULL,
  `ville_depart` varchar(60) NOT NULL,
  `ville_darrive` varchar(60) NOT NULL,
  `date_depart` date NOT NULL,
  `date_arrive` date NOT NULL,
  `lheure_depart` varchar(60) NOT NULL,
  `lheure__arrive` varchar(60) NOT NULL,
  `nombre_place_initiall` int(11) NOT NULL,
  `nombre_places` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vols`
--

INSERT INTO `vols` (`id`, `ville_depart`, `ville_darrive`, `date_depart`, `date_arrive`, `lheure_depart`, `lheure__arrive`, `nombre_place_initiall`, `nombre_places`) VALUES
(1, 'maroc', 'canada', '2021-01-29', '2021-02-06', '06:00', '11:00', 20, 20),
(2, 'france', 'america', '2021-02-08', '2021-02-14', '1', '8', 20, 20),
(3, 'maroc', 'italy', '2021-02-02', '2021-02-06', '4', '12', 20, 16);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_vol` (`id_vol`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vols`
--
ALTER TABLE `vols`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `vols`
--
ALTER TABLE `vols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`id_vol`) REFERENCES `vols` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
